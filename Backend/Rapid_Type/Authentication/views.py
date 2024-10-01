from django.shortcuts import redirect
from django.http import HttpResponse

def activate_redirect(request, uid, token):
    return redirect(f'http://localhost:5173/activate/{uid}/{token}/account-activate/')

def  redirect_password_change(request, uid, token):
    return redirect(f'http://localhost:5173/password/reset/confirm/{uid}/{token}/password-change/')
