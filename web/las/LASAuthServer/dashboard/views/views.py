from __init__ import *

def home(request):
    try:
        name = request.user.username
        baseUrl = LASModule.objects.get(shortname='BBM').home_url + 'api/dhbd'
        # biobank/api/dhbd/aliquot_derivation/
        url = baseUrl + '/aliquot_derivation/' + name
        req = urllib2.Request(url)
        u = urllib2.urlopen(req)
        res=u.read()
        print 'res der ' + res

        if res == 'errore':
            raise Exception('Error in get aliquot derivation')

        test_string = res.replace('"[', '')
        res = test_string.replace(']"', '')
        test_string = res.replace(' ', '')

        der_array = [int(s) for s in test_string.split(',')]

        totAliqDer = 0
        for cnt in der_array:
            totAliqDer += cnt
        
        # biobank/api/dhbd/aliquot_split/
        url = baseUrl + '/aliquot_split/' + name
        req = urllib2.Request(url)
        u = urllib2.urlopen(req)
        res=u.read()

        if res == 'errore':
            raise Exception('Error in get aliquot split')

        print 'res split ' + res
        cntSplit = res.replace('"', '')

        # biobank/api/dhbd/aliquot_slideLab/
        url = baseUrl + '/aliquot_slideLab/' + name
        req = urllib2.Request(url)
        u = urllib2.urlopen(req)
        res=u.read()

        print 'res slide lab ' + res
        cntSlideLab = res.replace('"', '')

        if res == 'errore':
            raise Exception('Error in get aliquot slide lab')

        # biobank/api/dhbd/aliquot_slidePrep/
        url = baseUrl + '/aliquot_slidePrep/' + name
        req = urllib2.Request(url)
        u = urllib2.urlopen(req)
        res=u.read()
        
        print 'res slide prep ' + res
        cntSlidePrep = res.replace('"', '')

        if res == 'errore':
            raise Exception('Error in get aliquot slide prep')


        variables = RequestContext(request, {'form':True, 'cntAliqDer':totAliqDer, 'cntStep1':der_array[0], 'cntStep2':der_array[1],
                                            'cntStep3':der_array[2], 'cntStep4':der_array[3], 'cntSplit':cntSplit, 'cntSlideLab':cntSlideLab,
                                            'cntSlidePrep':cntSlidePrep})
        return render_to_response('indexDashboard.html', variables)

    except Exception,e:
        print e
        variables = RequestContext(request, {'errore':True})
        return render_to_response('indexDashboard.html',variables)
