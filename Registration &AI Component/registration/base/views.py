from io import BytesIO
import os
from django.db import connection
from django.http import HttpResponse, JsonResponse
from django.shortcuts import render,redirect
from sklearn.metrics import accuracy_score
from sklearn.model_selection import train_test_split
from base.models import Registration,CapturedPhoto, SignUpDB
import cv2
from django.http import JsonResponse
import numpy as np
from django.core.files.base import ContentFile
from PIL import Image
from sklearn.preprocessing import LabelEncoder
from sklearn.svm import SVC
import joblib
import time
from django.urls import reverse
from django.core.mail import EmailMultiAlternatives
from django.conf import settings


# Create your views here.
def registration(request):
    if request.method=='POST':
        name=request.POST['name']
        email=request.POST['email']
        contact=request.POST['contactno']
        parent=request.POST['parent-name']
        gender=request.POST['gender']
        dob=request.POST['date-of-birth']
        nat=request.POST['nationality']
        address=request.POST['address']
        # adhaar=request.POST['adhaar']
        board=request.POST['board']
        per=request.POST['per']
        roll=request.POST['rollno']
        cid=request.POST['cid']
        # Check if a registration with the given roll number already exists
        if Registration.objects.filter(roll_number=roll).exists():
            error_message = "A student with this roll number already exists."
            return render(request, 'base/Registration.html', {'error_message': error_message})

        # Retrieve uploaded files
        # adhaar_doc = request.FILES['adhaardoc']
        # marks_card = request.FILES['marks-card']

        total_registrations = Registration.objects.count()+1
        appli_number = f"NU2024{total_registrations:05d}"
        signup = SignUpDB.objects.create(
            full_name=name.upper(),
            app_number=appli_number
        )
        # Create a new Registration object and save it to the database
        registration = Registration.objects.create(
            full_name=name,
            email=email,
            contact_number=contact,
            parent_name=parent,
            gender=gender,
            date_of_birth=dob,
            nationality=nat,
            address=address,
            # adhaar_number=adhaar,
            board_name=board,
            roll_number=roll,
            percentage_cgpa=per,
            # adhaar_document=adhaar_doc,
            # marks_card=marks_card,
            app_number=appli_number,
            cid=cid,
        )

        registration.save()
        # request.session['registration_completed'] = True
        # Redirect to a success page or any other page
        return redirect('application')

    # Render the Registration.html template
    return render(request, 'base/Registration.html')

def hallticket(request):
    # if not request.session.get('registration_completed'):
    #     return redirect('registration')
    if request.method == 'POST':
        application_number = request.POST.get('application-number')  # Use get() to avoid KeyError
        try:
            registration = Registration.objects.get(app_number=application_number)
            # Additional data to pass to the frontend
            context = {
                'registration': registration,
                'application_number': application_number,
                'success_message': 'Registration found successfully.'
            }
            return render(request, 'base/HallTicketTemplate.html', context)
        except Registration.DoesNotExist:
            return HttpResponse('No registration found for the provided application number.')
    else:
        return render(request, 'base/HallTicket.html')

    
    
def application(request):
    # if not request.session.get('registration_completed'):
    #     return redirect('registration')
    # Count total registrations in the database
    total_registrations = Registration.objects.count()
    # Generate application number in NU2024 format
    application_number = f"NU2024{total_registrations:05d}"
    
    # Retrieve the last Registration object
    last_registration = Registration.objects.order_by('app_number').last()

    # Initialize roll number and full name as empty strings
    roll_number = ""
    full_name = ""
    cid=""

    # Check if there's any registration object
    if last_registration:
        # Retrieve roll_number and full_name from last_registration record obtained
        roll_number = last_registration.roll_number
        full_name = last_registration.full_name
        cid=last_registration.cid
    
    context = {
        'application_number': application_number,
        'roll_number': roll_number,
        'full_name': full_name,
        'cid': cid,
    }
    return render(request, 'base/Application.html', context)

def halltickettemplate(request):
    if not request.session.get('registration_completed'):
        return redirect('registration')
    # Render the HallTicketTemplate.html template
    return render(request, 'base/HallTicketTemplate.html')



def about(request):
    # Render the About.html template
    return render(request, 'base/About.html')

def c(request):
    # Render the C.html template
    return render(request, 'base/C.html')

def carousel(request):
    # Render the Carousel.html template
    return render(request, 'base/Carousel.html')

def carouselcard(request):
    # Render the CarouselCard.html template
    return render(request, 'base/Coursecard.html')

def eligibility(request):
    # Render the Eligibility.html template
    return render(request, 'base/Eligibility.html')

def footer(request):
    # Render the Footer.html template
    return render(request, 'base/Footer.html')

def statistic(request):
    return render(request, 'base/Statistic.html')

def videos(request):
    return render(request, 'base/Videos.html')

def visionmission(request):
    return render(request, 'base/VisionMission.html')

def AIDS(request):
    return render(request, 'base/Courses/AIDS.html')

def AIML(request):
    return render(request, 'base/Courses/AIML.html')

def BIO(request):
    return render(request, 'base/Courses/BIO.html')

def CCE(request):
    return render(request, 'base/Courses/CCE.html')

def Civil(request):
    return render(request, 'base/Courses/Civil.html')

def CSC(request):
    return render(request, 'base/Courses/CSC.html')

def CSE(request):
    return render(request, 'base/Courses/CSE.html')

def CSF(request):
    return render(request, 'base/Courses/CSF.html')

def EC(request):
    return render(request, 'base/Courses/EC.html')

def EE(request):
    return render(request, 'base/Courses/EE.html')

def EV(request):
    return render(request, 'base/Courses/EV.html')

def IS(request):
    return render(request, 'base/Courses/IS.html')

def ME(request):
    return render(request, 'base/Courses/ME.html')

def RA(request):
    return render(request, 'base/Courses/RA.html')

def aboutus(request):
    return render(request, 'base/AboutUs.html')

def admin(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')
        
        # Check if user with provided username and password exists in SignUpDB
        try:
            user = SignUpDB.objects.get(full_name=username, app_number=password)
            # Construct the URL for view-demo with dynamic parameters
            view_demo_url = reverse('view_demo', kwargs={'username': username, 'password': password})
            # Redirect to the constructed URL
            return redirect(view_demo_url)
        except SignUpDB.DoesNotExist:
            error_message = "Invalid username or password. Please try again."
            return render(request, 'base/Admin.html', {'error_message': error_message})

    return render(request, 'base/Admin.html')

def admissions(request):
    return render(request, 'base/Admissions.html')

def index(request):
    return render(request, 'base/index.html')

def examportal(request):
    return render(request, 'base/examportal.html')

def examportalRej(request):
    return render(request, 'base/portalrej.html')

def examPortalQues(request):   
    return render(request, 'base/examPortalQues.html')

def capture_photos(request):
    # if not request.session.get('registration_completed'):
    #     return redirect('registration')
    # Get the most recent registration
    last_registration = Registration.objects.order_by('app_number').last()

    # Check if last_registration is available
    if last_registration is None:
        return JsonResponse({'error': 'No registrations found'})

    # Create a folder for the student's name
    student_folder = os.path.join('media', 'captured_photos', last_registration.full_name)
    os.makedirs(student_folder, exist_ok=True)
    cv2.namedWindow('Captured Frame', cv2.WINDOW_NORMAL)
    # Capture 10 photos
    cap = cv2.VideoCapture(0)

        # Capture a photo
    ret, frame = cap.read()
    for i in range(1, 11):
        # Initialize OpenCV camera
       
        if ret:
            cv2.imshow('Captured Frame', frame)
            cv2.waitKey(1000)
            # Convert the NumPy array to a suitable image format
            image = Image.fromarray(cv2.cvtColor(frame, cv2.COLOR_BGR2RGB))

            # Save the captured photo directly inside the student's folder
            photo_path = os.path.join(student_folder, f'captured_photo_{i}.jpg')
            image.save(photo_path, format='JPEG')

            # Create a CapturedPhoto instance and save it to the database
            with open(photo_path, 'rb') as f:
                photo_content = ContentFile(f.read())
            photo = CapturedPhoto(student=last_registration)
            photo.photo.save(f'captured_photo_{i}.jpg', photo_content)
            
        # Release the camera
        cap.release()
        cv2.destroyAllWindows()
    # Return a JSON response
    return redirect('success')

def success(request): 
    # if not request.session.get('registration_completed'):
    #     return redirect('registration')
    total_registrations = Registration.objects.count()
    application_number = f"NU2024{total_registrations:05d}"
    last_registration = Registration.objects.order_by('app_number').last()

   
    full_name = ""
    email = ""
    # Check if there's any registration object
    if last_registration:
        full_name = last_registration.full_name
        email = last_registration.email
    
    context = {
        'application_number': application_number,
        'full_name': full_name,
        'email':email,
     
    }
    text_content = f"Hi {full_name},\n\nThank you for successfully registering for the NUCAT-2024 test. You have taken a great decision in choosing us for excelling in your career. Your application number is {application_number}.\n\nPlease go to http://127.0.0.1:8000/hallticket/ for generating your E-hall ticket\n\nAll the best for your exam!\n\nRegards,\nNUCAT Admission Team"
    email=email.rstrip()
      
        # Create an EmailMultiAlternatives object
    email_content = EmailMultiAlternatives(
            subject='Registration Confirmation for NUCAT-2024', 
            body=text_content, 
            from_email=settings.EMAIL_HOST_USER, 
            to=[email]
        )
        
        # Send the email
    email_content.send()
    return render(request, 'base/demo.html', context)


def preprocess_image(image):
    # Convert the image to grayscale
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    # Resize the image to a fixed size (e.g., 100x100)
    resized_image = cv2.resize(gray, (100, 100))
    # Flatten the resized image (reshape to 1D array)
    flattened_image = resized_image.flatten()
    return flattened_image

# Define your train_model function
def training_model(request):
    # Retrieve images from the database
    captured_photos = CapturedPhoto.objects.all()

    # Initialize lists to store preprocessed images and corresponding labels
    faces = []
    labels = []

    for photo in captured_photos:
        # Load the image from the database
        image = cv2.imread(photo.photo.path)
        if image is None:
            continue

        # Preprocess the image
        processed_image = preprocess_image(image)

        # Add the preprocessed image to the faces list
        faces.append(processed_image)

        # Add the label (student's name or ID) to the labels list
        labels.append(photo.student.full_name)

    # Convert labels to integers using LabelEncoder
    label_encoder = LabelEncoder()
    labels_encoded = label_encoder.fit_transform(labels)

    # Split data into training and testing sets
    X_train, X_test, y_train, y_test = train_test_split(np.array(faces), labels_encoded, test_size=0.2, random_state=42)

    # Train the model using Support Vector Machine (SVM) classifier
    svm_classifier = SVC(C=1.0, kernel='linear', probability=True)
    svm_classifier.fit(X_train, y_train)

    # Evaluate the model
    y_pred = svm_classifier.predict(X_test)
    accuracy = accuracy_score(y_test, y_pred)*100
    print("Model accuracy:", accuracy)

    # Save the trained model to a file
    model_file_path = 'face_recognition_model.pkl'
    joblib.dump((svm_classifier, label_encoder), model_file_path)

    return HttpResponse("Model trained successfully")

# Define your recognize_face function
def recognize_face(face_roi):
    # Load the trained model
    model_file_path = 'face_recognition_model.pkl'
    svm_classifier, label_encoder = joblib.load(model_file_path)

    # Preprocess the face ROI
    processed_face_roi = preprocess_image(face_roi)

    # Predict the label for the face ROI
    label_encoded = svm_classifier.predict(np.array([processed_face_roi]))

    # Convert the predicted label back to the original label
    predicted_label = label_encoder.inverse_transform(label_encoded)

    return predicted_label[0]



def view_demo(request, username, password):
    # Train the model first
    training_model(request)

    # Load face detection cascade
    face_cascade = cv2.CascadeClassifier('static/haarcascade_frontalface_default.xml')

    # Initialize OpenCV camera
    cap = cv2.VideoCapture(0)

    # Start time for the timeout
    start_time = time.time()

    # Loop for capturing video stream
    while True:
        ret, frame = cap.read()
        if not ret:
            break

        # Convert the frame to grayscale
        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

        # Detect faces in the grayscale frame
        faces = face_cascade.detectMultiScale(gray, scaleFactor=1.3, minNeighbors=5)

        # For each detected face
        for (x, y, w, h) in faces:
            # Extract the face region from the original frame
            face_roi = frame[y:y+h, x:x+w]

            # Recognize the face using the trained model
            recognized_student_name = recognize_face(face_roi)
            print(recognized_student_name)

            # Check if the recognized student name matches the username
            if recognized_student_name.upper() == username:
                # Release the camera and close OpenCV windows
                cap.release()
                cv2.destroyAllWindows()

                # Redirect to the exam portal
                return redirect('examportal')

            # Draw a rectangle around the detected face
            cv2.rectangle(frame, (x, y), (x+w, y+h), (255, 0, 0), 2)

        # Display the frame in a window without labels
        cv2.imshow('Face Recognition Demo', frame)

        # Check if one minute has passed
        if time.time() - start_time > 57:
            # Release the camera and close OpenCV windows
            cap.release()
            cv2.destroyAllWindows()

            # Redirect to the exam portal rejection page
            return redirect('examportalRej')

        # Break the loop if 'q' is pressed
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

    # Release the camera and close OpenCV windows
    cap.release()
    cv2.destroyAllWindows()

    # If no match is found, return a response indicating so
    return redirect('examportalRej')
