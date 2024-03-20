from rest_framework import serializers

from .models import Datatype

class DatatypesSerializers(serializers.ModelSerializer):
  class Meta:
    model = Datatype
    fields = [
      'file',
      'filepath',
      'dtype'
    ]

class ViewAllDatatype(serializers.ModelSerializer):
    class Meta:
        model = Datatype
        fields = "__all__"

class UpdateDatatypeSerializer(serializers.ModelSerializer):
   class Meta:
      model = Datatype
      fields = ['dtype']