from django.urls import path
from .views import LanguageTextCreateView,LanguageTextDetailView
urlpatterns=[
path("",LanguageTextCreateView.as_view(), name='Language-Text-list-create'),
path('<str:name>/', LanguageTextDetailView.as_view(), name='Language-Text-detail'),


];
