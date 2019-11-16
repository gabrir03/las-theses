from catissue.tissue.models import *
from catissue.tissue.genealogyID import *
from catissue.tissue.forms import *
from django.db import transaction
from django.db.models import Q
from django.template.context import RequestContext
from django.shortcuts import render_to_response
from django.http import HttpResponse
import string,urllib,urllib2,json,requests,random, ast
from django.template.loader import render_to_string
from catissue.global_request_middleware import *

from itertools import chain
from django.conf import settings
import os.path
from catissue.settings import TEMP_URL


def getAllMdamTemplates ():
    mdamUrl = Urls.objects.get(idWebService=WebService.objects.get(name='MDAM').id)
    url = mdamUrl.url + '/api/listtemplates/'
    templates = []
    print 'url',url
    req = urllib2.Request(url, headers={'workingGroups' : get_WG_string()})
    u = urllib2.urlopen(req)
    res=u.read()
    res=ast.literal_eval(res)
    return res


def getMdamTemplates (templateList):
    mdamUrl = Urls.objects.get(idWebService=WebService.objects.get(name='MDAM').id)
    url = mdamUrl.url + '/api/describetemplate/'
    templates = []
    print 'url',url
    for t in templateList:
        data = urllib.urlencode({'template_id':t})
        print 'data',data
        req = urllib2.Request(url + '?' + data, headers={'workingGroups' : get_WG_string()})
        u = urllib2.urlopen(req)
        res=u.read()
        res=ast.literal_eval(res)
        templates.append(res)
    return templates


def getMDAMData():
    wg = list(get_WG())
    mdamUrl = Urls.objects.get(idWebService=WebService.objects.get(name='MDAM').id)
    url = mdamUrl.url + "/api/runtemplate/"

    values_to_send = {'template_id':56}
    print 'values_to_send',values_to_send
    data = urllib.urlencode(values_to_send)
    try:
        u = urllib2.urlopen(url, data)
    except Exception, e:
        print e
        print "An error occurred while trying to retrieve data from "+str(url)   

    res=u.read()
    result=json.loads(res)
    
    resSet = []
    for x in result['body']:
        for obj in x:
            resSet.append(obj)
    #     g = GenealogyID(x[1]) # x[1] genid
    #     resSet[g.getGenID()] = ''
    #     if len(x[8][0]):
    #         resSet[g.getGenID()] = x[8][0][0][0] 
       
    return resSet


def getAllAliquotDerivationSchedule (name):
    liste = []
    disable_graph()
    # lista1=AliquotDerivationSchedule.objects.filter(derivationExecuted=0,operator=name,loadQuantity=None,idKit=None,deleteTimestamp=None)
    lista1=AliquotDerivationSchedule.objects.filter(Q(derivationExecuted=0)&Q(Q(operator=name)|Q(operator=''))&Q(loadQuantity=None)&Q(idKit=None)&Q(deleteTimestamp=None)).order_by('id')
    lista2=AliquotDerivationSchedule.objects.filter(Q(derivationExecuted=0)&Q(Q(operator=name)|Q(operator=''))&~Q(idDerivationProtocol=None)&Q(idKit=None)&~Q(loadQuantity=None)&~Q(initialDate=None)&Q(volumeOutcome=None)&Q(measurementExecuted=0)&Q(deleteTimestamp=None)).order_by('validationTimestamp','initialDate','id')
    lista3=AliquotDerivationSchedule.objects.filter(Q(derivationExecuted=0)&Q(Q(operator=name)|Q(operator=''))&~Q(idDerivationProtocol=None)&~Q(loadQuantity=None)&~Q(initialDate=None)&Q(volumeOutcome=None)&Q(measurementExecuted=0)&Q(deleteTimestamp=None)).order_by('validationTimestamp','initialDate','id')
    lista4=AliquotDerivationSchedule.objects.filter(Q(derivationExecuted=0)&Q(Q(operator=name)|Q(operator=''))&~Q(idDerivationProtocol=None)&~Q(initialDate=None)&Q(measurementExecuted=1)&Q(deleteTimestamp=None)).order_by('validationTimestamp','initialDate','id')
    enable_graph()
    # print 'lista1',lista1
    liskitsi=[]
    for aliq in lista2:
        if aliq.idDerivationProtocol.idKitType!=None:
            liskitsi.append(aliq)
    
    # print 'lista2',liskitsi
    #devo filtrare ancora per togliere quelli che non hanno un kit, ma che dovrebbero averlo
    lisfin=[]
    for aliq in lista3:
        if aliq.idKit!=None or aliq.idDerivationProtocol.idKitType==None:
            lisfin.append(aliq)
    liste.append(lista1)
    liste.append(liskitsi)
    liste.append(lisfin)
    liste.append(lista4)
    
    # print 'lista3',lisfin
    # print 'kitsi',liskitsi
    # lista=list(chain(lista1,liskitsi,lisfin,lista4))
    return liste
