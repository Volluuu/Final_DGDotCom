function ModalBasic({ setModalOpen, id, title, content, writer }) {
  // 모달 끄기
  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div
      style={{
        width: "300px",
        height: "200px",
        zIndex: "999",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        backgroundColor: "gray",
        border: "1px solid black",
        borderRadius: "8px",
      }}
    >
      <button
        style={{ position: "absolute", right: "10px", top: "10px" }}
        onClick={closeModal}
      >
        X
      </button>
      <p>모달창입니다.</p>
    </div>
  );
}
export default ModalBasic;
