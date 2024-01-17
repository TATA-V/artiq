import { supabase } from 'src/lib/supabase/client';

const getImgUrl = async (img: { file: File, path: string }) => {
  const formData = new FormData();
  formData.append('image', img.file);

  const { data, error } = await supabase
    .storage
    .from('images')
    .upload(`${img.path}/${img.file.name}`, formData, {
      cacheControl: '3600',
      upsert: false,
    });
  if (error) {
    alert(error.message);
    return;
  }

  const {
    data: {
      publicUrl,
    },
  } = await supabase
    .storage
    .from('images')
    .getPublicUrl(data.path);

  return publicUrl;
};

export default getImgUrl;
