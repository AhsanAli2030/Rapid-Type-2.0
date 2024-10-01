from django.shortcuts import redirect
from django.http import HttpResponse

def activate_redirect(request, uid, token):
    # This is where you can handle the redirect
    # You can redirect to any URL you want, e.g., a specific page or external link
    return redirect(f'http://localhost:5173/activate/{uid}/{token}/')
