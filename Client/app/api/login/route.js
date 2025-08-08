// app/api/login/route.js
export async function POST(request) {
  const { email, password } = await request.json();

  if (email === "admin@example.com" && password === "123456") {
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        "Set-Cookie": `token=valid-token; Path=/; HttpOnly`,
        "Content-Type": "application/json",
      },
    });
  }

  return new Response(JSON.stringify({ success: false }), {
    status: 401,
    headers: { "Content-Type": "application/json" },
  });
}
