from django.urls import path

from .views import UploadCsv, GetDetails, UpdateDetails, GetDetailsById

urlpatterns = [
  path("upload/", UploadCsv.as_view(), name='upload'),
  path("allfiles/", GetDetails.as_view(), name='allfiles'),
  path("allfiles/display/<int:pk>/", GetDetailsById.as_view(), name='allfilesbyid'),
  path("update/<int:pk>/", UpdateDetails.as_view(), name='update')
]