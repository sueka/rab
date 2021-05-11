import { useCallback, useMemo } from 'react'
import { useRecoilState } from 'recoil'

import installedGtmContainerIdsState from '~/lib/atoms/installedGtmContainerIdsState'
import stripMargin from '~/lib/extensions/String/stripMargin'
import typed from '~/lib/typed'

// TODO: Support Data Layer
// cf. https://developers.google.com/tag-manager/quickstart
export default function useGtm(containerId: `GTM-${string}`) {
  const [installedIds, setInstalledIds] = useRecoilState(installedGtmContainerIdsState)

  const scriptSnippet = useMemo(() => {
    const script = document.createElement('script')

    // tslint:disable-next-line:no-object-mutation
    script.textContent = stripMargin(typed<[`GTM-${string}`]>`
      |(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      |new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      |j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      |'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
      |})(window,document,'script','dataLayer','${ containerId }');`)

    return script
  }, [containerId])

  // NOTE: <nocript> の内容は flow/phrasing/metadata content なので、 `noScriptSnippet.textContent === ''` であり、 textContent を使う方法は不正。また、 innerHTML を使うと、 HTML インジェクション攻撃を受ける危険性が増す。
  const noScriptSnippet = useMemo(() => {
    const noScript = document.createElement('noscript')
    const iFrame = document.createElement('iframe')

    noScript.appendChild(iFrame)

    /* tslint:disable:no-object-mutation */
    iFrame.src = typed<[`GTM-${string}`]>`https://www.googletagmanager.com/ns.html?id=${ containerId }`
    iFrame.height = '0'
    iFrame.width = '0'
    iFrame.style.display = 'none'
    iFrame.style.visibility = 'hidden'
    /* tslint:enable:no-object-mutation */

    return noScript
  }, [containerId])

  const install = useCallback(() => {
    if (installedIds.includes(containerId)) {
      throw new Error // TODO
    }

    document.head.insertBefore(scriptSnippet, document.head.firstChild)
    document.body.insertBefore(noScriptSnippet, document.body.firstChild)

    setInstalledIds(ids => [...ids, containerId])
  }, [containerId, scriptSnippet, noScriptSnippet])

  return { install }
}
