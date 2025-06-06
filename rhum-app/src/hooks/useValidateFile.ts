const useValidateFile = (file: File | null) => {
  if(!file) {
    return true
  }
  const allowedExtensions = ['jpg','png'];
  const sizeLimit = 3000000;
  const {name:fileName, size:fileSize} = file;
  const fileExtension = fileName.split(".").pop();

  if(!allowedExtensions.includes(fileExtension!)){
    alert("file type not allowed");
    return false;
  }else if(fileSize > sizeLimit){
    alert("file size too large")
    return false;
  }
  return true;
}

export default useValidateFile;
