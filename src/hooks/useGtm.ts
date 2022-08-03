import { useInjection } from 'inversify-react'
import { useRecoilCallback } from 'recoil'

import { shouldBePresent } from '~/asserters/commonAsserters'
import installedGtmContainerIdsState from '~/atoms/installedGtmContainerIdsState'
import ConfigRegistry from '~/config/ConfigRegistry'
import stripMargin from '~/extensions/String/stripMargin'
import typed from '~/typed'

// TODO: remove
// cf. https://developers.google.com/tag-manager/quickstart
function createScriptSnippet(gtmUrl: string, containerId: `GTM-${string}`) {
  const script = document.createElement('script')

  script.textContent = stripMargin(typed<[string, `GTM-${string}`]>`
    |(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    |new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    |j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    |'${ gtmUrl }/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    |})(window,document,'script','dataLayer','${ containerId }');`)

  return script
}

// TODO: remove
// NOTE: <nocript> の内容は flow/phrasing/metadata content なので、 `noScriptSnippet.textContent === ''` であり、 textContent を使う方法は不正。また、 innerHTML を使うと、 HTML インジェクション攻撃を受ける危険性が増す。
// cf. https://developers.google.com/tag-manager/quickstart
function createNoScriptSnippet(gtmUrl: string, containerId: `GTM-${string}`) {
  const noScript = document.createElement('noscript')
  const iFrame = document.createElement('iframe')

  noScript.appendChild(iFrame)

  iFrame.src = typed<[string, `GTM-${string}`]>`${ gtmUrl }/ns.html?id=${ containerId }`
  iFrame.height = '0'
  iFrame.width = '0'
  iFrame.style.display = 'none'
  iFrame.style.visibility = 'hidden'

  return noScript
}

// TODO: Support Data Layer
export default function useGtm() {
  const config = useInjection<ConfigRegistry>('EnvVarConfig')
  const gtmUrl = config.get('GTM_URL')

  const install = useRecoilCallback(({ snapshot, set }) => async (containerId: `GTM-${string}`) => {
    shouldBePresent(gtmUrl)

    const installedIds = await snapshot.getPromise(installedGtmContainerIdsState)

    if (installedIds.includes(containerId)) {
      return // do nothing
    }

    const scriptSnippet = createScriptSnippet(gtmUrl, containerId)
    const noScriptSnippet = createNoScriptSnippet(gtmUrl, containerId)

    document.head.insertBefore(scriptSnippet, document.head.firstChild)
    document.body.insertBefore(noScriptSnippet, document.body.firstChild)

    set(installedGtmContainerIdsState, ids => [...ids, containerId])
  }, [gtmUrl])

  return { install }
}
