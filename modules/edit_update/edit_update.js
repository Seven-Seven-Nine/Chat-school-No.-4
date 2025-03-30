function editUpdate() {
  bindEvent();
}

function bindEvent() {
  document.getElementById('btn-delete').onclick = () => handlerBtnDelete();
}

function handlerBtnDelete() {
  const urlParams = new URLSearchParams(window.location.href);
  const idUpdate = urlParams.get('id_update');
  window.location = `/controllers/controller_handler.php?delete_update&id_update=${idUpdate}`;
}

editUpdate();