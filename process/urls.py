from django.urls import path

from .views import UploadCsv, GetDetails, UpdateDetails

urlpatterns = [
  path("upload/", UploadCsv.as_view(), name='upload'),
  path("allfiles/", GetDetails.as_view(), name='allfiles'),
  path("update/<int:pk>/", UpdateDetails.as_view(), name='update')
]