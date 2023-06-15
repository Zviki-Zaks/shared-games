export interface BackdropProps {
  onClose: () => void;
  className?: string;
  children: React.ReactNode;
}

const Backdrop: React.FC<BackdropProps> = ({
  children,
  onClose,
  className,
}) => {
  return (
    <section
      className={`${
        className ?? ""
      } fixed inset-0 z-10 h-full w-full overflow-hidden bg-transparent`}
      onClick={onClose}
    >
      {children}
    </section>
  );
};

export default Backdrop;
