from django.shortcuts import render, get_object_or_404
import csv
import subprocess
import os
from django.shortcuts import render, redirect
from rest_framework.views import APIView
from .models import Datatype
from .serializers import DatatypesSerializers, ViewAllDatatype, UpdateDatatypeSerializer

import json
from rest_framework import status, generics, serializers
from rest_framework.response import Response
# Create your views here.

class UploadCsv(APIView):
  def post(self,req,format=None):
    serializer = DatatypesSerializers(data=req.data)
    print(req.FILES['file'])
    print(serializer.is_valid())
    if serializer.is_valid(raise_exception=True):
      
      file = req.FILES['file']
      print(file.name)
      filename = f'uploads/{file.name}'
      # with open(filename, 'wb') as destination:
      #     for chunk in csv_file.chunks():
      #         destination.write(chunk) 
      try:
        script_output = subprocess.run(['python', f'{os.getcwd()}/infer_data_types.py', filename],capture_output=True,text=True)
      except:
        return subprocess.CalledProcessError()
      print(script_output)
      processed_data = script_output.stdout
      print(script_output.stdout)
      file = Datatype(file=file,filepath=file.name,dtype=processed_data)
      file.save()

      return Response({"msg":"successful"}, status=status.HTTP_200_OK)
    return Response({"msg":"Error"},status=status.HTTP_400_BAD_REQUEST)

class GetDetails(APIView):
  def get(self,req,format=None):
    try:
      file_details = Datatype.objects.order_by('id')
      serialized_data = ViewAllDatatype(file_details,many=True)
      return Response(serialized_data.data, status.HTTP_200_OK)
    except Exception as e:
      return Response({'errors': str(e)}, status.HTTP_400_BAD_REQUEST)

class GetDetailsById(APIView):
  def get(self,req, pk, format=None):
    try:
      file = get_object_or_404(Datatype, id=pk)
      serialised = ViewAllDatatype(file)
      return Response(serialised.data, status.HTTP_200_OK)
    except Exception as e:
      return Response({'errors': str(e)}, status.HTTP_400_BAD_REQUEST)



class UpdateDetails(generics.UpdateAPIView):
  serializer_class = UpdateDatatypeSerializer
  def update(self,req,pk, *args, **kargs):
    file = get_object_or_404(Datatype, id=pk)
    file_id = file.id
    
    serializer = self.get_serializer(file, data=req.data,partial=True)
    if serializer.is_valid():
      serializer.save()
      return Response({"message": "Updated successfully"}, status.HTTP_200_OK)
    else:
      return Response({"failed": serializer.errors}, status.HTTP_400_BAD_REQUEST)


# def process_script_output(output_string):
# # Parse the script output (assuming JSON format)
#   print(output_string)
#   #data = json.loads(output_string)
#   # Extract relevant data for each row and create ProcessedData objects
#   processed_data_list = []
#   for row in output_string:
#       processed_data_list.append(Datatypes(string=row['string'], int64=row['int64'],int32=row['int32'], int16=row['int16'],
#                                             int8=row['int8'],float64=row['float64'], float32=row['float32'],datetime64=row['datetime64'],
#                                             timedelta=row['timedelta'],boolean=row['boolean'],category=row['category']))  # Adapt based on your model fields
#   return processed_data_list