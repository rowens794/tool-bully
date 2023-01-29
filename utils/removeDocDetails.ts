//remove the data between leading and ending --- in the mdx file
export const removeDocDetails = (file: string) => {
  const cleanedFile = file.split("---")[2];
  return cleanedFile;
};
