import { CgSpinner } from "react-icons/cg";

interface SpinnerProps {
  active: boolean;
  disableSpinner?: boolean;
}

export const Spinner = (props: SpinnerProps) => {
  if (props.disableSpinner != null) {
    const docStyleOverflow = props.disableSpinner ? "hidden" : "unset";
    document.body.style.overflow = docStyleOverflow;
  }

  return (
    <div className={props.active ? "visible" : "hidden"}>
      <div className="fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden flex flex-col items-center justify-center bg-black/75 opacity-75 backdrop-blur-sm">
        <div role="status">
          <CgSpinner className="w-10 h-10 mr-2 text-gray-200 animate-spin dark:text-gray-100" />
        </div>
      </div>
    </div>
  );
};
