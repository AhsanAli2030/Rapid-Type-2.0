

from django.contrib import admin
from django.urls import path,include
from Authentication.views import activate_redirect
urlpatterns = [
    path('admin/', admin.site.urls),
    path('testing-strings/', include("Testing_Strings.urls")),
    path('auth/', include("djoser.urls")),
    path('auth/', include("djoser.urls.jwt")),
    path('activate/<str:uid>/<str:token>/', activate_redirect, name='activate_redirect'),
]
