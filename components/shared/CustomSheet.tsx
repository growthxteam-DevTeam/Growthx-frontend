import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import SubmitButton from '@/components/shared/SubmitButton';

export interface CustomSheetProps {
  isOpen?: boolean;
  onClose?: () => void;
  title?: string;
  description?: string;
  children?: React.ReactNode;
  className?: string;
  side?: 'top' | 'right' | 'bottom' | 'left';
  size?: 'small' | 'smallLg' | 'normal' | 'medium' | 'mediumLg' | 'large';
  onAccept?: () => void;
  acceptLabel?: string;
  isLoading?: boolean;
  acceptDisabled?: boolean;
  onContentScroll?: (e: React.UIEvent<HTMLDivElement>) => void;
  footer?: React.ReactNode;
  testId?: string;
}

const sizeClasses = {
  small: 'sm:max-w-sm',
  smallLg: 'sm:max-w-md',
  normal: 'sm:max-w-lg',
  medium: 'sm:max-w-xl',
  mediumLg: 'sm:max-w-2xl',
  large: 'sm:max-w-3xl',
};

const CustomSheet = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  className,
  side = 'right',
  size = 'normal',
  onAccept,
  acceptLabel = 'I Accept',
  isLoading,
  acceptDisabled,
  onContentScroll,
  footer,
  testId,
}: CustomSheetProps) => {
  const hasFooter = onAccept || footer;

  return (
    <Sheet
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) onClose?.();
      }}
    >
      <SheetContent
        data-testid={testId}
        side={side}
        className={cn('w-full gap-0 p-0 bg-white border-white', sizeClasses[size], className)}
      >
        <SheetHeader className="px-6 py-4 border-b border-gray-200">
          {title ? (
            <SheetTitle className="text-base font-semibold text-gray-900">{title}</SheetTitle>
          ) : (
            <SheetTitle className="sr-only">Sheet</SheetTitle>
          )}
          <SheetDescription className={description ? undefined : 'sr-only'}>
            {description ?? title ?? 'Sheet'}
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 px-6 py-5 overflow-y-auto space-y-4" onScroll={onContentScroll}>
          {children}
        </div>

        {hasFooter && (
          <SheetFooter className="px-6 py-4 border-t border-gray-200 flex-row justify-end">
            {footer ?? (
              <SubmitButton
                type="button"
                clickFn={onAccept}
                isLoading={isLoading}
                loadingText="Processing..."
                disabled={acceptDisabled}
                className="px-8"
              >
                {acceptLabel}
              </SubmitButton>
            )}
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CustomSheet;