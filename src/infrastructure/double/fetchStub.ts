const fetchStub: typeof fetch = async (input, init?) => {
  const url = input instanceof URL ? input.href : typeof input !== 'string' ? input.url : input

  if (init?.method === 'GET' && /^https:\/\/api\.github\.com\/repos\/(?<owner>.*)\/(?<repo>.*)$/.test(url)) {
    return new Response(new Blob([JSON.stringify({
      full_name: 'anonymous/foobar',
      html_url: 'https://github.com/anonymous/foobar',
    })], {
      type: 'application/json',
    }), {
      status: 200,
    })
  }

  throw new Error
}

export default fetchStub
