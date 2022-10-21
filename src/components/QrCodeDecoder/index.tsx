import jsQR from 'jsqr'
import React, { useCallback, useMemo, useState } from 'react'
import { FormattedMessage } from 'react-intl'

import { shouldBePresent } from '~/asserters/commonAsserters'
import FileUpload, { Props as FileUploadProps } from '~/components/FileUpload'
import messages from './messages'

const QrCodeDecoder: React.FC = () => {
  const canvas = useMemo(() => document.createElement('canvas'), [])
  const context = useMemo(() => canvas.getContext('2d'), [canvas])
  const [decoded, setDecoded] = useState<string>()

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
    const { files } = event.currentTarget

    if (files === null || files.length === 0) {
      return // do nothing
    }

    shouldBePresent(files[0])

    const file = files[0]
    const url = URL.createObjectURL(file)
    const image = new Image

    image.onload = load
    image.src = url

    URL.revokeObjectURL(url)
  }, [load])

  const render = useCallback<Required<FileUploadProps>['renderResultMessage']>((fs) => {
    if (fs === null || fs.length === 0) {
      return <FormattedMessage { ...messages.noFileSelected } />
    }

    return decoded
  }, [decoded])

  return (
    <FileUpload
      onChange={ handleChange }
      renderResultMessage={ render }
      accept="image/*"
    />
  )
}

export default QrCodeDecoder
