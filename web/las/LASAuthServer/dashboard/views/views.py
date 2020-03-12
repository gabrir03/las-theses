from __init__ import *

def home(request):
    try:
        variables = RequestContext(request, {'form':True})
        return render_to_response('indexDashboard.html', variables)

    except Exception,e:
        print e
        variables = RequestContext(request, {'errore':True})
        return render_to_response('indexDashboard.html',variables)

def loadDerived(request):
    try:
        name = request.user.username
        baseUrl = LASModule.objects.get(shortname='BBM').home_url + 'api/dhbd'
        # biobank/api/dhbd/aliquot_derivation/
        url = baseUrl + '/aliquot_derivation/' + name
        req = urllib2.Request(url)
        u = urllib2.urlopen(req)
        jResponse = json.load(u)
        res=u.read()
        if res == 'errore':
            raise Exception('Error in get aliquot derivation')

        totRobot = 0
        totNorm = 0
        for robot in jResponse['dataRobot']:
            totRobot = totRobot + robot
        
        for norm in jResponse['data']:
            totNorm = totNorm + norm

        totNorm = totNorm + totRobot

        response_data = {}
        response_data['data'] = 'Ok'
        response_data['aliqDer'] = totNorm
        return HttpResponse(json.dumps(response_data), content_type="application/json")
    except Exception, e:
        print e
        response_data = {}
        response_data['data'] = 'error'
        return HttpResponse(json.dumps(response_data), content_type="application/json")

def loadSplit(request):
    try:
        name = request.user.username
        baseUrl = LASModule.objects.get(shortname='BBM').home_url + 'api/dhbd'
        # biobank/api/dhbd/aliquot_split/
        url = baseUrl + '/aliquot_split/' + name
        req = urllib2.Request(url)
        u = urllib2.urlopen(req)
        jResponse = json.load(u)
        res=u.read()
        if res == 'errore':
            raise Exception('Error in get aliquot split')

        response_data = {}
        response_data['data'] = 'Ok'
        response_data['aliqSplit'] = jResponse['data']
        return HttpResponse(json.dumps(response_data), content_type="application/json")
    except Exception, e:
        print e
        response_data = {}
        response_data['data'] = 'error'
        return HttpResponse(json.dumps(response_data), content_type="application/json")

def loadSlideLab(request):
    try:
        name = request.user.username
        baseUrl = LASModule.objects.get(shortname='BBM').home_url + 'api/dhbd'
        # biobank/api/dhbd/aliquot_slideLab/
        url = baseUrl + '/aliquot_slideLab/' + name
        req = urllib2.Request(url)
        u = urllib2.urlopen(req)
        jResponse = json.load(u)
        res=u.read()
        if res == 'errore':
            raise Exception('Error in get aliquot slide lab')

        response_data = {}
        response_data['data'] = 'Ok'
        response_data['aliqSlideLab'] = jResponse['data']
        return HttpResponse(json.dumps(response_data), content_type="application/json")
    except Exception, e:
        print e
        response_data = {}
        response_data['data'] = 'error'
        return HttpResponse(json.dumps(response_data), content_type="application/json")

def loadSlidePrep(request):
    try:
        name = request.user.username
        baseUrl = LASModule.objects.get(shortname='BBM').home_url + 'api/dhbd'
        # biobank/api/dhbd/aliquot_slidePrep/
        url = baseUrl + '/aliquot_slidePrep/' + name
        req = urllib2.Request(url)
        u = urllib2.urlopen(req)
        jResponse = json.load(u)
        res=u.read()
        if res == 'errore':
            raise Exception('Error in get aliquot slide prep')

        response_data = {}
        response_data['data'] = 'Ok'
        response_data['aliqSlidePrep'] = jResponse['data']
        return HttpResponse(json.dumps(response_data), content_type="application/json")
    except Exception, e:
        print e
        response_data = {}
        response_data['data'] = 'error'
        return HttpResponse(json.dumps(response_data), content_type="application/json")

def loadRevalue(request):
    try:
        name = request.user.username
        baseUrl = LASModule.objects.get(shortname='BBM').home_url + 'api/dhbd'
        # biobank/api/dhbd/aliquot_slidePrep/
        url = baseUrl + '/aliquot_revalue/' + name
        req = urllib2.Request(url)
        u = urllib2.urlopen(req)
        jResponse = json.load(u)
        res=u.read()
        if res == 'errore':
            raise Exception('Error in get aliquot revalue')

        response_data = {}
        response_data['data'] = 'Ok'
        response_data['aliqRevalue'] = jResponse['data']
        return HttpResponse(json.dumps(response_data), content_type="application/json")
    except Exception, e:
        print e
        response_data = {}
        response_data['data'] = 'error'
        return HttpResponse(json.dumps(response_data), content_type="application/json")

def loadTransfers(request):
    try:
        name = request.user.username
        baseUrl = LASModule.objects.get(shortname='BBM').home_url + 'api/dhbd'
        # # biobank/api/dhbd/aliquot_transfer/
        url = baseUrl + '/aliquot_transfer/' + name
        req = urllib2.Request(url)
        u = urllib2.urlopen(req)
        jResponse = json.load(u)
        res=u.read()
        if res == 'errore':
            raise Exception('Error in get aliquot transfer')

        totAliq = 0
        for aliq in jResponse['data']:
            totAliq = totAliq + aliq

        response_data = {}
        response_data['data'] = 'Ok'
        response_data['aliqTransfer'] = totAliq
        return HttpResponse(json.dumps(response_data), content_type="application/json")
    except Exception, e:
        print e
        response_data = {}
        response_data['data'] = 'error'
        return HttpResponse(json.dumps(response_data), content_type="application/json")

def loadImplantedMice(request):
    try:
        name = request.user.username
        baseUrl = LASModule.objects.get(shortname='XMM').home_url + 'api/dhbd'
        # # xeno/api/dhbd/implanted_mice/
        url = baseUrl + '/implanted_mice/' + name
        req = urllib2.Request(url)
        u = urllib2.urlopen(req)
        jResponse = json.load(u)
        res=u.read()
        if res == 'errore':
            raise Exception('Error in get aliquot transfer')

        response_data = {}
        response_data['data'] = 'Ok'
        response_data['implantedMice'] = jResponse['data']
        return HttpResponse(json.dumps(response_data), content_type="application/json")
    except Exception, e:
        print e
        response_data = {}
        response_data['data'] = 'error'
        return HttpResponse(json.dumps(response_data), content_type="application/json")
