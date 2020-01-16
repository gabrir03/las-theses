from django.core.urlresolvers import reverse
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render_to_response
from django.template import loader, Context, RequestContext
from piston.handler import BaseHandler
from xenopatients.models import *
from django.core import serializers
from django.db import models
from django.http import HttpResponse
from django.db.models import Q
import string
import operator
from datetime import date, timedelta, datetime
from api.utils import *
from xenopatients.utils import *
from xenopatients.externalAPIhandler import *
from xenopatients.treatments import splitNameT, getNameT, getNamePT
from django.contrib import auth
from django.db.models import Max
import time  
from apisecurity.decorators import get_functionality_decorator
from django.utils.decorators import method_decorator
from django.utils import timezone

class ImplantedMiceHandler(BaseHandler):
    allowed_methods = ('GET')
    @method_decorator(get_functionality_decorator)
    def read(self, request, nome):
        try:
            operatore=User.objects.get(username=nome)
            disable_graph()
            listaWG = WG_User.objects.filter(user=operatore)
            enable_graph()
            wg_set = set()
            for wgUser in listaWG:
                currentWG = set(str(wgUser.WG.name))
                if currentWG.isdisjoint(wg_set):
                    wg_set.add(str(wgUser.WG.name))

            filter_list = Status.objects.filter( name__in = ['implanted', 'ready for explant', 'explantLite', 'toSacrifice', 'waste'])
            disable_graph()
            biomice_list = BioMice.objects.filter(id__in = BioMice_WG.objects.filter(WG__name__in=list(wg_set)).values_list('biomice__id'), 
                            phys_mouse_id__in = Mice.objects.filter(id_status__in = filter_list).values_list('id'))
            enable_graph()
            return {'data':len(biomice_list)}
        except Exception, e:
            print 'error', e
            return {'data':'errore'}

class AvailableMiceHandler(BaseHandler):
    allowed_methods = ('GET')
    @method_decorator(get_functionality_decorator)
    def read(self, request):
        try:
            disable_graph()
            mice_list = Mice.objects.exclude(id__in = BioMice.objects.all().values_list('phys_mouse_id'))
            enable_graph()
            return {'data':len(mice_list)}
        except Exception, e:
            print 'error', e
            return {'data':'errore'}

class MiceUnderTreatmentHandler(BaseHandler):
    allowed_methods = ('GET')
    @method_decorator(get_functionality_decorator)
    def read(self, request, nome):
        try:
            operatore=User.objects.get(username=nome)
            disable_graph()
            listaWG = WG_User.objects.filter(user=operatore)
            enable_graph()
            wg_set = set()
            for wgUser in listaWG:
                currentWG = set(str(wgUser.WG.name))
                if currentWG.isdisjoint(wg_set):
                    wg_set.add(str(wgUser.WG.name))

            disable_graph()
            mice_list = Mice_has_arms.objects.filter(start_date__isnull = False, expected_end_date__isnull = False, end_date__isnull = True, 
                        id_mouse__in = BioMice.objects.filter(id__in = BioMice_WG.objects.filter(WG__name__in=list(wg_set)).values_list('biomice__id')))
            enable_graph()
            return {'data':len(mice_list)}
        except Exception, e:
            print 'error', e
            return {'data':'errore'}

class ExplantMiceHandler(BaseHandler):
    allowed_methods = ('GET')
    @method_decorator(get_functionality_decorator)
    def read(self, request, nome):
        try:
            operatore=User.objects.get(username=nome)
            disable_graph()
            listaWG = WG_User.objects.filter(user=operatore)
            enable_graph()
            wg_set = set()
            for wgUser in listaWG:
                currentWG = set(str(wgUser.WG.name))
                if currentWG.isdisjoint(wg_set):
                    wg_set.add(str(wgUser.WG.name))
            
            filter_list = Status.objects.filter( name__in = ['ready for explant', 'explantLite'])
            disable_graph()
            mice_list = Mice.objects.filter(id_status__in = filter_list, 
            id__in = BioMice.objects.filter(id__in = BioMice_WG.objects.filter(WG__name__in=list(wg_set)).values_list('biomice__id')).values_list('phys_mouse_id'))
            # BioMice.objects.filter(id__in = BioMice_WG.objects.filter(WG__name__in=list(wg_set)).values_list('biomice__id'), 
            #                 phys_mouse_id__in = Mice.objects.filter(id_status__in = filter_list).values_list('id'))
            enable_graph()

            readyForExplant=[]
            explantLite=[]
            for mice in mice_list:
                if mice.id_status == Status.objects.get(name='ready for explant'):
                    readyForExplant.append(mice)
                if mice.id_status == Status.objects.get(name='explantLite'):
                    explantLite.append(mice)
            
            lista = []
            lista.append(len(readyForExplant))
            lista.append(len(explantLite))
            return {'data':lista}
        except Exception, e:
            print 'error', e
            return {'data':'errore'}
