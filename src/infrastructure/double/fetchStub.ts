const fetchStub: typeof fetch = async (input, init?) => {
  if (init?.method === 'GET' && input === 'https://api.github.com/repos/sueka/rap') {
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
