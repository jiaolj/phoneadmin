from django.shortcuts import render_to_response

def page_not_found(request):
    return render_to_response('error/404.html')

def page_error(request):
    return render_to_response('error/500.html')