import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import SubmitButton from '@/components/shared/SubmitButton';

export interface CustomModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  title?: string;
  description?: string;
  children?: React.ReactNode;
  className?: string;
  size?: 'small' | 'smallLg' | 'normal' | 'medium' | 'mediumLg' | 'large' | 'verylarge';
  onAccept?: () => void;
  acceptLabel?: string;
  isLoading?: boolean;
  acceptDisabled?: boolean;
  onContentScroll?: (e: React.UIEvent<HTMLDivElement>) => void;
  footer?: React.ReactNode;
  testId?: string;
}

const sizeClasses = {
  small: 'sm:max-w-md',
  smallLg: 'sm:max-w-lg',
  normal: 'sm:max-w-[1000px]',
  medium: 'sm:max-w-2xl',
  mediumLg: 'sm:max-w-3xl',
  large: 'sm:max-w-6xl',
  verylarge: 'sm:max-w-8xl',
};

const CustomModal = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  className,
  size = 'smallLg',
  onAccept,
  acceptLabel = 'I Accept',
  isLoading,
  acceptDisabled,
  onContentScroll,
  footer,
  testId,
}: CustomModalProps) => {
  const hasFooter = onAccept || footer;

  return (
    <Dialog open={isOpen} onOpenChange={onClose} modal={true}>
      <DialogContent
        data-testid={testId}
        className={cn('p-0 gap-0 overflow-hidden', sizeClasses[size], className)}
      >
        <div className="px-6 py-4 border-b border-gray-200">
          {title ? (
            <DialogTitle className="text-base font-semibold text-gray-900">{title}</DialogTitle>
          ) : (
            <DialogTitle className="sr-only">Modal</DialogTitle>
          )}
          <DialogDescription className={description ? undefined : 'sr-only'}>
            {description ?? title ?? 'Modal'}
          </DialogDescription>
        </div>

        <div className="px-6 py-5 max-h-72 overflow-y-auto space-y-4" onScroll={onContentScroll}>
          {children}
        </div>

        {hasFooter && (
          <div className="px-6 py-4 border-t border-gray-200 flex justify-end">
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
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CustomModal;