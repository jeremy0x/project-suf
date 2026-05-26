import { useMediaQuery } from "@/hooks/useMediaQuery";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from "@/components/ui/drawer";

interface ResponsiveModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  children: React.ReactNode;
}

export function ResponsiveModal({
  isOpen,
  onOpenChange,
  title,
  description,
  children,
}: ResponsiveModalProps) {
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  if (isDesktop) {
    return (
      <Dialog open={isOpen} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-gray-100 sm:rounded-2xl shadow-xl">
          <DialogHeader>
            <DialogTitle className="font-heading font-bold text-xl text-gray-900 dark:text-gray-100">
              {title}
            </DialogTitle>
            {description && (
              <DialogDescription className="text-sm text-gray-400 mt-1">
                {description}
              </DialogDescription>
            )}
          </DialogHeader>
          <div className="py-2">{children}</div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={isOpen} onOpenChange={onOpenChange}>
      <DrawerContent className="max-h-[92vh] flex flex-col bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 text-gray-900 dark:text-gray-100">
        <DrawerHeader className="text-left shrink-0 p-5 border-b border-gray-100 dark:border-gray-800">
          <DrawerTitle className="font-heading font-bold text-xl text-gray-900 dark:text-gray-100">
            {title}
          </DrawerTitle>
          {description && (
            <DrawerDescription className="text-sm text-gray-400 mt-1">
              {description}
            </DrawerDescription>
          )}
        </DrawerHeader>
        <div className="px-5 py-6 overflow-y-auto flex-1">{children}</div>
      </DrawerContent>
    </Drawer>
  );
}
