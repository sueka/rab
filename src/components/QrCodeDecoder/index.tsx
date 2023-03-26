import jsQR from 'jsqr'
import React, { useCallback, useMemo, useState } from 'react'
import { FormattedMessage } from 'react-intl'

import { shouldBePresent } from '~/asserters/commonAsserters'
import FileUpload from '~/components/FileUpload'
import messages from './messages'

const QrCodeDecoder: React.FC = () => {
  const canvas = useMemo(() => document.createElement('canvas'), [])
  const context = useMemo(() => canvas.getContext('2d'), [canvas])
  const [files, setFiles] = useState<FileList>()
  const [decoded, setDecoded] = useState<string>()

  /// files[0] を src に持つ Image を ImageData に変換し、QR コードを生成する
  const load = useCallback(({ currentTarget: image }) => {
    shouldBePresent(context)

    const height = image.height
    const width = image.width

    canvas.height = height
    canvas.width = width

    context.drawImage(image, 0, 0)

    const imageData = context.getImageData(0, 0, width, height)

    const qrcode = jsQR(imageData.data, width, height, {
      inversionAttempts: 'dontInvert',
    })

    setDecoded(() => qrcode?.data)
  }, [canvas, context])

  const handleChange = useCallback<React.ChangeEventHandler<HTMLInputElement>>((event) => {
    setFiles(event.target.files ?? undefined)

    /// files[0] を Image に変換する
    if (event.target.files === null || event.target.files.length === 0) {
      return // do nothing
    }

    shouldBePresent(event.target.files[0])

    const file = event.target.files[0]
    const url = URL.createObjectURL(file)
    const image = new Image

    image.onload = load
    image.src = url

    URL.revokeObjectURL(url)
  }, [load])

  const resultMessage = useMemo(() => {
    if (files === undefined || files.length === 0) {
      return <FormattedMessage { ...messages.noFileSelected } />
    }

    if (decoded === undefined) {
      return <FormattedMessage { ...messages.decodingFailed } />
    }

    return decoded
  }, [files, decoded])

  return (
    <FileUpload
      accept="image/*"
      resultMessage={ resultMessage }
      onChange={ handleChange }
    />
  )
}

export default QrCodeDecoder
