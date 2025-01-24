"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { ReactNode, Suspense, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { updateSettingsByCurrentUserSchema } from "@/lib/schemas";
import { api } from "@/lib/trpc/react";

import { Button } from "./ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Skeleton } from "./ui/skeleton";

export function Settings({
  isOpen,
  onOpenChange,
}: {
  isOpen: boolean;
  onOpenChange: (value: boolean) => void;
}) {
  const [isCloseAllowed, setIsCloseAllowed] = useState(true);

  const handleOpenChange = (value: boolean) => {
    if (!value && !isCloseAllowed) return;
    onOpenChange(value);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent>
        <Suspense
          fallback={
            <SettingsLayout isSubmitDisabled>
              <FormItem>
                <Label>Open Router API Key</Label>
                <Skeleton className="h-10 w-full" />
              </FormItem>
            </SettingsLayout>
          }
        >
          <SettingsForm setCloseAllowed={setIsCloseAllowed} />
        </Suspense>
      </DialogContent>
    </Dialog>
  );
}

function SettingsLayout({
  children,
  isCancelDisabled = false,
  isSubmitLoading = false,
  isSubmitDisabled = false,
}: {
  children: ReactNode;
  isCancelDisabled?: boolean;
  isSubmitLoading?: boolean;
  isSubmitDisabled?: boolean;
}) {
  return (
    <>
      <DialogHeader>
        <DialogTitle>Settings</DialogTitle>
      </DialogHeader>

      <div className="my-4">{children}</div>

      <DialogFooter>
        <DialogClose asChild disabled={isCancelDisabled}>
          <Button type="button" variant="outline">
            Cancel
          </Button>
        </DialogClose>

        <Button
          type="submit"
          variant="default"
          disabled={isSubmitDisabled || isSubmitLoading}
        >
          {isSubmitLoading && <Loader2 className="animate-spin" />}
          Save
        </Button>
      </DialogFooter>
    </>
  );
}

function SettingsForm({
  setCloseAllowed,
}: {
  setCloseAllowed: (value: boolean) => void;
}) {
  const [settings] = api.settings.byCurrentUser.useSuspenseQuery();

  const form = useForm<z.infer<typeof updateSettingsByCurrentUserSchema>>({
    resolver: zodResolver(updateSettingsByCurrentUserSchema),
    defaultValues: {
      openRouterApiKey: settings?.openRouterApiKey ?? "",
    },
  });

  const utils = api.useUtils();

  const { mutateAsync } = api.settings.updateByCurrentUser.useMutation({
    onSuccess: () => utils.settings.byCurrentUser.invalidate(),
  });

  const handleSubmit = form.handleSubmit(async (data) => {
    setCloseAllowed(false);
    try {
      await mutateAsync(data);
      toast.success("Settings updated");
    } catch (error) {
      toast.error("Failed to update settings");
    } finally {
      setCloseAllowed(true);
    }
  });

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit}>
        <SettingsLayout
          isCancelDisabled={form.formState.isSubmitting}
          isSubmitLoading={form.formState.isSubmitting}
        >
          <div className="my-4">
            <FormField
              control={form.control}
              name="openRouterApiKey"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Open Router API Key</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="sk-XXXXXXXX..." />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </SettingsLayout>
      </form>
    </Form>
  );
}
