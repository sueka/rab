import { useInjection } from 'inversify-react'
import { useRecoilCallback } from 'recoil'

import '~/ascertainers/dataLayer'

import { shouldBePresent } from '~/asserters/commonAsserters'
import gtmConsentsState, { GtmConsents } from '~/atoms/gtmConsentsState'
import installedGtmContainerIdsState from '~/atoms/installedGtmContainerIdsState'
import ConfigRegistry from '~/config/ConfigRegistry'
import delay, { timeOut } from '~/delay'
import stripMargin from '~/extensions/String/stripMargin'
import gtag from '~/helpers/google/gtag'
import typed from '~/typed'

declare const globalThis: Window

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

interface GtmJsEvent {
  event: 'gtm.js'
  'gtm.uniqueEventId': number
}

function isGtmInstalled() {
  const gtmJsEvent = globalThis.dataLayer.find(
    (data): data is GtmJsEvent => 'event' in data && data.event === 'gtm.js'
  )

  return gtmJsEvent !== undefined
}

// TODO: Remove
async function waitForGtmInstalled() {
  while (true) {
    const gtmInstalled = isGtmInstalled()

    if (gtmInstalled) {
      break
    }

    await delay(200) //
  }
}

export default function useGtm() {
  const config = useInjection<ConfigRegistry>('EnvVarConfig')
  const gtmUrl = config.get('GTM_URL')

  const install = useRecoilCallback(({ snapshot, set }) => async (
    containerId: `GTM-${string}`,
    consents: GtmConsents,
    timeout: number = 1000
  ) => {
    shouldBePresent(gtmUrl)
    shouldBePresent(globalThis.cookieStore)

    // Send default consents
    gtag('consent', 'default', {
      ad_storage: 'denied',
      analytics_storage: 'denied',
    })

    globalThis.dataLayer.push({ event: 'default_consent' })

    set(gtmConsentsState, consents)

    const installedIds = await snapshot.getPromise(installedGtmContainerIdsState)

    if (installedIds.includes(containerId)) {
      return true // do nothing
    }

    const scriptSnippet = createScriptSnippet(gtmUrl, containerId)
    const noScriptSnippet = createNoScriptSnippet(gtmUrl, containerId)

    document.head.insertBefore(scriptSnippet, document.head.firstChild)
    document.body.insertBefore(noScriptSnippet, document.body.firstChild)

    const installed = await Promise.race([
      timeOut(timeout),
      waitForGtmInstalled(),
    ]).then(
      () => {
        return true
      },
      reason => {
        console.warn(reason)

        return false // not installed
      }
    )

    if (installed) {
      set(installedGtmContainerIdsState, ids => [...ids, containerId])
    }

    return installed
  }, [gtmUrl])

  return { install }
}
