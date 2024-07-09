import uuid
from django.db import models

class Registration(models.Model):
    user_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    full_name = models.CharField(max_length=100)
    email = models.EmailField()
    contact_number = models.CharField(max_length=15)
    parent_name = models.CharField(max_length=100)
    gender = models.CharField(max_length=10)
    date_of_birth = models.DateField()
    nationality = models.CharField(max_length=100)
    address = models.TextField()
    # adhaar_number = models.CharField(max_length=20)
    # adhaar_document = models.FileField(upload_to='adhaar_documents/')
    board_name = models.CharField(max_length=100)
    roll_number = models.CharField(max_length=20, unique=True)  # Ensure unique roll numbers
    percentage_cgpa = models.CharField(max_length=20)
    # marks_card = models.FileField(upload_to='marks_cards/')
    app_number = models.CharField(max_length=20,null=True,blank=True)
    cid= models.CharField(max_length=100,default='')

    def __str__(self):
        return self.full_name
    

class CapturedPhoto(models.Model):
    student = models.ForeignKey(Registration, on_delete=models.CASCADE, related_name='captured_photos')
    photo = models.ImageField(upload_to='captured_photos/')
    captured_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Photo for {self.student.full_name}"
    
class SignUpDB(models.Model):
    full_name = models.CharField(max_length=100)
    app_number = models.CharField(max_length=20)

    def __str__(self):
        return self.full_name

