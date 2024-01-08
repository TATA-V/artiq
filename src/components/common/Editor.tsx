'use client'

import { useState, useRef, useMemo } from 'react'
import ReactQuill, { Quill } from 'react-quill'
import ImageResize from 'quill-image-resize'
import 'react-quill/dist/quill.snow.css'
import { supabase } from 'src/lib/supabase/client'

function Editor() {
  const [value, setValue] = useState('')
  const [images, setImages] = useState<File[]>([]) // 삭제 예정

  const quillRef = useRef<ReactQuill>(null)
  Quill.register('modules/ImageResize', ImageResize)

  const imageHandler = () => {
    if (typeof document !== 'undefined') {
      const input = document.createElement('input')
      input.setAttribute('type', 'file')
      input.setAttribute('accept', 'image/*')
      input.click()

      input.addEventListener('change', async () => {
        if (!input.files) return
        const file = input.files[0]
        setImages((prev) => [...prev, file]) // 삭제 예정

        const formData = new FormData()
        formData.append('image', file)

        const { data, error } = await supabase
          .storage
          .from('images')
          .upload(`post/1/${file.name}`, formData, {
            cacheControl: '3600',
            upsert: false,
          })
        if (error) {
          alert(error.message)
          return
        }

        const quill = quillRef.current?.getEditor()
        const range = quill?.getSelection()
        if (quill && range) {
          const {
            data: {
              publicUrl,
            },
          } = await supabase
            .storage
            .from('images')
            .getPublicUrl(data.path)
          quill.insertEmbed(range.index, 'image', publicUrl)
        }
      })
    }
  }

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          ['bold', 'italic', 'underline', 'strike'],
          ['blockquote', 'code-block'],
          [{ list: 'ordered' }, { list: 'bullet' }],
          [{ color: [] }, { background: [] }],
          [{ font: [] }],
          [{ align: [] }],
          ['image'],
        ],
        handlers: {
          image: imageHandler,
        },
        ImageResize: {
          parchment: Quill.import('parchment'),
          modules: ['Resize', 'DisplaySize'],
        },
      },
    }),
    [],
  )

  return (
    <>
      <ReactQuill ref={quillRef} className="w-full h-full" theme="snow" value={value} onChange={setValue} modules={modules} />
      {/* test */}
      {images.map((image, index) => (
        <div key={index}>{image.name}</div>
      ))}
    </>
  )
}

export default Editor
