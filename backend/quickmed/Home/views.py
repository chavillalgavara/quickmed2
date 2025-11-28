from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Contact

@api_view(['POST'])
def save_contact(request):
    data = request.data

    Contact.objects.create(
        name=data.get("name"),
        email=data.get("email"),
        phone=data.get("phone"),
        service=data.get("service"),
        message=data.get("message"),
    )

    return Response({"message": "Contact saved successfully!"}, status=status.HTTP_201_CREATED)


from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Review
from .serializers import ReviewSerializer

# Submit a review
@api_view(['POST'])
def submit_review(request):
    serializer = ReviewSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({'success': 'Review submitted successfully'})
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Get all approved reviews
@api_view(['GET'])
def list_reviews(request):
    reviews = Review.objects.filter(status='approved').order_by('-created_at')
    serializer = ReviewSerializer(reviews, many=True)
    return Response(serializer.data)
