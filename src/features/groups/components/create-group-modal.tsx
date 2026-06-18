import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { X, Layers } from "lucide-react";
import { createGroupSchema, CreateGroupSchemaType } from "../schemas/create-group.schema";
import { useCreateGroup } from "../hooks/use-groups";
import { FormFieldWrapper } from "@/features/auth/components/form-field-wrapper";
import { SubmitButton } from "@/features/auth/components/submit-button";

interface CreateGroupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateGroupModal({ isOpen, onClose }: CreateGroupModalProps) {
  const [mounted, setMounted] = useState(false);
  const { mutate: createGroup, isPending } = useCreateGroup();

  const form = useForm<CreateGroupSchemaType>({
    resolver: zodResolver(createGroupSchema),
    mode: "onChange",
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const { register, handleSubmit, formState: { errors, isValid }, reset } = form;

  useEffect(() => {
    setMounted(true);
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleModalClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen]);

  const handleModalClose = () => {
    reset();
    onClose();
  };

  const onSubmit = (data: CreateGroupSchemaType) => {
    createGroup(data, {
      onSuccess: () => {
        handleModalClose();
      },
    });
  };

  if (!mounted || !isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 animate-fade-in select-none">
      {/* Backdrop overlay */}
      <div 
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-md cursor-pointer"
        onClick={handleModalClose}
      />
      
      {/* Premium Modal Container */}
      <div className="relative w-full max-w-[640px] flex flex-col bg-card border border-border rounded-3xl shadow-sm dark:shadow-2xl overflow-hidden animate-slide-up shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8)] transition-colors">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 md:p-8 border-b border-border bg-secondary/60 shrink-0 transition-colors">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-500 to-indigo-600 text-white shadow-sm shadow-blue-500/20">
              <Layers className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-xl font-black text-foreground tracking-tight leading-none transition-colors">
                Create Contact Group
              </h2>
              <p className="text-xs font-semibold text-muted-foreground mt-1.5 transition-colors">
                Group your contacts together for targeted campaigns.
              </p>
            </div>
          </div>
          <button
            onClick={handleModalClose}
            title="Close"
            aria-label="Close"
            className="p-2.5 rounded-xl text-muted-foreground hover:text-foreground hover:bg-secondary/80 border border-border transition-all cursor-pointer bg-secondary"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Modal Body / Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col p-6 md:p-8 space-y-7" noValidate>
          <FormFieldWrapper
            label="Group Name *"
            htmlFor="title"
            error={errors.title?.message}
          >
            <input
              {...register("title")}
              id="title"
              type="text"
              placeholder="e.g. Premium Customers"
              disabled={isPending}
              autoComplete="off"
              className={`w-full h-[52px] px-4 rounded-xl border bg-background text-[15px] font-medium text-foreground placeholder:text-muted-foreground/70 focus:outline-none transition-all disabled:bg-secondary disabled:text-muted-foreground ${
                errors.title
                  ? "border-destructive focus:ring-2 focus:ring-destructive/20 focus:border-destructive"
                  : "border-border focus:ring-2 focus:ring-primary/20 focus:border-primary"
              }`}
            />
          </FormFieldWrapper>

          <FormFieldWrapper
            label="Description"
            htmlFor="description"
            error={errors.description?.message}
          >
            <textarea
              {...register("description")}
              id="description"
              placeholder="Describe the purpose of this group and the type of contacts it contains."
              disabled={isPending}
              rows={6}
              className={`w-full p-4 rounded-xl border bg-background text-[15px] font-medium text-foreground placeholder:text-muted-foreground/70 focus:outline-none transition-all disabled:bg-secondary disabled:text-muted-foreground resize-none ${
                errors.description
                  ? "border-destructive focus:ring-2 focus:ring-destructive/20 focus:border-destructive"
                  : "border-border focus:ring-2 focus:ring-primary/20 focus:border-primary"
              }`}
            />
          </FormFieldWrapper>

          {/* Form Actions */}
          <div className="flex gap-3 pt-6 border-t border-border transition-colors">
            <button
              type="button"
              onClick={handleModalClose}
              disabled={isPending}
              className="flex-1 h-[52px] rounded-xl border border-border hover:border-foreground/10 bg-secondary hover:bg-secondary/80 text-foreground font-semibold text-sm transition-all duration-200 cursor-pointer disabled:opacity-50"
            >
              Cancel
            </button>
            <div className="flex-1">
              <SubmitButton
                isLoading={isPending}
                loadingText="Creating Group..."
                className="w-full"
                disabled={isPending || !isValid}
              >
                Create Group
              </SubmitButton>
            </div>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
}
