const Modal = ({ videoKey, toggle, isOpen }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed animate-slide bg-black/40 backdrop-blur-sm z-50 inset-0 flex justify-center items-center">
      {videoKey && (
        <iframe
          className="w-[90%] max-w-3xl aspect-video rounded-lg"
          autoPlay
          frameBorder="0"
          title="Trailer"
          src={`https://www.youtube.com/embed/${videoKey}`}
          allow="autoplay"
          allowfullscreen="allowfullscreen"
        />
      )}
      <div
        onClick={() => toggle(false)}
        className={"fixed transition-all inset-0 bg-black/30 -z-10"}
      />
    </div>
  );
};
export default Modal;
