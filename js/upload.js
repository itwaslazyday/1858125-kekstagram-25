const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const uploadForm = document.querySelector('.img-upload__form');
const uploadField = document.querySelector('#upload-file');
const picturePreview = uploadForm.querySelector('.img-upload__preview img');

//Загрузка фотографии с локальной машины, проверка на соответствие типу расширения
function showUploadFile () {
  const file = uploadField.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
  if (matches) {
    picturePreview.src = URL.createObjectURL(file);
  }
}

export {showUploadFile};
