import { useCallback } from 'react'
import Resizer from 'react-image-file-resizer'

export const useResizeFile = () => {
  const resizeFile = useCallback(
    (file: File, width: number, height: number) =>
      new Promise((resolve) => {
        Resizer.imageFileResizer(
          file,
          width,
          height,
          'JPEG',
          60,
          0,
          (uri) => {
            resolve(uri)
          },
          'base64'
        )
      }),
    []
  )

  const processImage = useCallback(
    async (
      imageFile: File | undefined,
      width: number,
      height: number
    ): Promise<string> => {
      if (imageFile !== undefined) {
        if (/image.*/.exec(imageFile.type)) {
          return (await resizeFile(imageFile, width, height)) as string
        } else {
          return ''
        }
      } else {
        return ''
      }
    },
    [resizeFile]
  )

  /**
   * 画像ファイルのサイズをチェックする
   */
  const imageSize = async (file: File | undefined) => {
    return new Promise(
      (
        resolve: (value: { width: number; height: number }) => void,
        reject: (reason?: any) => void
      ) => {
        const img = new Image()

        img.onload = () => {
          const size = {
            width: img.naturalWidth,
            height: img.naturalHeight,
          }

          URL.revokeObjectURL(img.src)
          resolve(size)
        }

        img.onerror = (error) => {
          reject(error)
        }

        img.src = URL.createObjectURL(file)
      }
    )
  }
  return { processImage, imageSize }
}
