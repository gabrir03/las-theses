from __init__ import *

def home(request):
    try:
        # test_string = res.replace('"[', '')
        # res = test_string.replace(']"', '')
        # test_string = res.replace(' ', '')

        # der_array = [int(s) for s in test_string.split(',')]

        # totAliqDer = 0
        # for cnt in der_array:
        #     totAliqDer += cnt
        
        # # biobank/api/dhbd/aliquot_split/
        # url = baseUrl + '/aliquot_split/' + name
        # req = urllib2.Request(url)
        # u = urllib2.urlopen(req)
        # res=u.read()

        # if res == 'errore':
        #     raise Exception('Error in get aliquot split')

        # print 'res split ' + res
        # cntSplit = res.replace('"', '')

        # # biobank/api/dhbd/aliquot_slideLab/
        # url = baseUrl + '/aliquot_slideLab/' + name
        # req = urllib2.Request(url)
        # u = urllib2.urlopen(req)
        # res=u.read()

        # print 'res slide lab ' + res
        # cntSlideLab = res.replace('"', '')

        # if res == 'errore':
        #     raise Exception('Error in get aliquot slide lab')

        # # biobank/api/dhbd/aliquot_slidePrep/
        # url = baseUrl + '/aliquot_slidePrep/' + name
        # req = urllib2.Request(url)
        # u = urllib2.urlopen(req)
        # res=u.read()
        
        # print 'res slide prep ' + res
        # cntSlidePrep = res.replace('"', '')

        # if res == 'errore':
        #     raise Exception('Error in get aliquot slide prep')

        # # biobank/api/dhbd/aliquot_slidePrep/
        # url = baseUrl + '/aliquot_revalue'
        # req = urllib2.Request(url)
        # u = urllib2.urlopen(req)
        # res=u.read()
        
        # print 'res revalue ' + res
        # cntRevalue = res.replace('"', '')

        # if res == 'errore':
        #     raise Exception('Error in get aliquot revalue')

        # # biobank/api/dhbd/aliquot_transfer/
        # url = baseUrl + '/aliquot_transfer/' + name
        # req = urllib2.Request(url)
        # u = urllib2.urlopen(req)
        # res=u.read()
        # print 'res transfer ' + res

        # if res == 'errore':
        #     raise Exception('Error in get aliquot transfer')

        # test_string = res.replace('"[', '')
        # res = test_string.replace(']"', '')
        # test_string = res.replace(' ', '')

        # transfer_array = [int(s) for s in test_string.split(',')]

        # totAliqTransfer = 0
        # for cnt in transfer_array:
        #     totAliqTransfer += cnt


        variables = RequestContext(request, {'form':True}) # , 'cntAliqDer':totAliqDer, 'cntStep1':der_array[0], 'cntStep2':der_array[1],
                                            # 'cntStep3':der_array[2], 'cntStep4':der_array[3], 'cntSplit':cntSplit, 'cntSlideLab':cntSlideLab,
                                            # 'cntSlidePrep':cntSlidePrep, 'cntRevalue':cntRevalue, 'cntAliqTransfer':totAliqTransfer,
                                            # 'aliqTransfer':transfer_array[0], 'aliqReceive':transfer_array[1]})
        return render_to_response('indexDashboard.html', variables)

    except Exception,e:
        print e
        variables = RequestContext(request, {'errore':True})
        return render_to_response('indexDashboard.html',variables)

def loadData(request):
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

        print 'Json Response: ', jResponse
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