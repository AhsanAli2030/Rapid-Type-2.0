
from rest_framework import serializers
from .models import Languages_Text

class Language_Text_Serializer(serializers.ModelSerializer):
    class Meta:
        model = Languages_Text
        fields = '__all__'
