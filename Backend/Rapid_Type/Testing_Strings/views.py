from django.shortcuts import render
from rest_framework import generics
from .models import Languages_Text
from .serializers import Language_Text_Serializer
from rest_framework.exceptions import NotFound
# Create your views here.
class LanguageTextCreateView(generics.ListCreateAPIView):
    queryset = Languages_Text.objects.all()
    serializer_class = Language_Text_Serializer

# View to retrieve a specific book by ID
class LanguageTextDetailView(generics.RetrieveAPIView):
    queryset = Languages_Text.objects.all()
    serializer_class = Language_Text_Serializer

    def get_object(self):
        name = self.kwargs.get('name')
        try:
            return Languages_Text.objects.get(name=name)
        except Languages_Text.DoesNotExist:
            raise NotFound(detail="Item not found with the provided name.")
