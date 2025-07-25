from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token
from app.customer.models import Admin
from app.customer.api.serializers.admin_serializer import AdminSerializer ,LoginSerializer
from rest_framework.decorators import action


class AdminViewSet(viewsets.ModelViewSet):
    queryset = Admin.objects.all()
    serializer_class = AdminSerializer

    def list(self, request, *args, **kwargs):
        customers = self.get_queryset()
        serializer = self.get_serializer(customers, many=True)
        return Response( serializer.data)


    def retrieve(self, request, *args, **kwargs):
        customer = self.get_object()
        serializer = self.get_serializer(customer)
        return Response( serializer.data)


    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({
                "status": True,
                "message": "Customer created successfully.",
                "data": serializer.data
            }, status=status.HTTP_201_CREATED)
        print(serializer.errors)
        return Response({
            "status": False,
            "errors": serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)

    # def update(self, request, *args, **kwargs):
    #     customer = self.get_object()
    #     serializer = self.get_serializer(customer, data=request.data)
    #     if serializer.is_valid():
    #         serializer.save()
    #         return Response({
    #             "status": True,
    #             "message": "Customer updated successfully.",
    #             "data": serializer.data
    #         }, status=status.HTTP_200_OK)
    #     return Response({
    #         "status": False,
    #         "errors": serializer.errors
    #     }, status=status.HTTP_400_BAD_REQUEST)


    # @action(detail=False, methods=['post'], url_path='login')
    # def login(self, request):
    #     serializer = LoginSerializer(data=request.data)
    #     serializer.is_valid(raise_exception=True)
    #     username = serializer.validated_data['username']
    #     password = serializer.validated_data['password']
    #
    #     user = authenticate(username=username, password=password)
    #     if user and Admin.objects.filter(user=user).exists():
    #         token, _ = Token.objects.get_or_create(user=user)
    #         return Response({
    #             'token': token.key,
    #             'user': {
    #                 'id': user.id,
    #                 'username': user.username,
    #                 'email': user.email
    #             }
    #         }, status=status.HTTP_200_OK)
    #
    #     return Response({'error': 'Invalid credentials or not an admin'}, status=status.HTTP_401_UNAUTHORIZED)
    #


class LoginViewSet(viewsets.ModelViewSet):
    queryset = Admin.objects.none()
    serializer_class = LoginSerializer


    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            username = serializer.validated_data['username']
            password = serializer.validated_data['password']

            user = authenticate(username=username, password=password)
            if user and Admin.objects.filter(user=user).exists():
                token, _ = Token.objects.get_or_create(user=user)
                return Response({
                    'token': token.key,
                    'user': {
                        'id': user.id,
                        'username': user.username,
                        'email': user.email
                    }
                }, status=status.HTTP_200_OK)

        return Response({'error': 'Invalid credentials or not an admin'}, status=status.HTTP_401_UNAUTHORIZED)

    #     admins = self.get_queryset()
    #     serializer = self.get_serializer(admins, many=True)
    #     return Response(serializer.data)
    #
    # def retrieve(self, request, *args, **kwargs):
    #     admin = self.get_object()
    #     serializer = self.get_serializer(admin)
    #     return Response(serializer.data)
    #
    # def create(self, request, *args, **kwargs):
    #     serializer = self.get_serializer(data=request.data)
    #     if serializer.is_valid():
    #         serializer.save()
    #         return Response({
    #             "status": True,
    #             "message": "Admin created successfully.",
    #             "data": serializer.data
    #         }, status=status.HTTP_201_CREATED)
    #     return Response({
    #         "status": False,
    #         "errors": serializer.errors
    #     }, status=status.HTTP_400_BAD_REQUEST)
    #
    # def update(self, request, *args, **kwargs):
    #     admin = self.get_object()
    #     serializer = self.get_serializer(admin, data=request.data, partial=True)
    #     if serializer.is_valid():
    #         serializer.save()
    #         return Response({
    #             "status": True,
    #             "message": "Admin updated successfully.",
    #             "data": serializer.data
    #         }, status=status.HTTP_200_OK)
    #     return Response({
    #         "status": False,
    #         "errors": serializer.errors
    #     }, status=status.HTTP_400_BAD_REQUEST)
