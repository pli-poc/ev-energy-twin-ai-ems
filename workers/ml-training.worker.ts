import {generateAnnualDataset} from '@/lib/twin/annual';
import {evaluateModel,FEATURE_NAMES,fitNetwork,type Network,type Sample} from '@/lib/twin/ml';
import type {AnnualSettings} from '@/lib/twin/annual';

type Start={type:'train';settings:AnnualSettings;epochs:number;seed:number};
const scope=self as unknown as {postMessage:(message:unknown)=>void;onmessage:((event:MessageEvent<Start>)=>void)|null};
scope.onmessage=(event:MessageEvent<Start>)=>{
 if(event.data?.type!=='train')return;
 try{
  const {settings,epochs,seed}=event.data;
  const generated=generateAnnualDataset(settings,p=>scope.postMessage({type:'progress',...p}));
  const train=generated.samples.filter(s=>s.split==='train'),validation=generated.samples.filter(s=>s.split==='validation'),test=generated.samples.filter(s=>s.split==='test');
  const fit=fitNetwork(train,validation,{epochs,seed,onProgress:p=>scope.postMessage({type:'epoch',...p})});
  const base:Network={schemaVersion:1,algorithm:'compact-mlp-v1',createdAt:new Date().toISOString(),teacherPolicy:settings.teacherPolicy,market:settings.optimizer.market,days:generated.days,rowCount:generated.samples.length,trainRows:train.length,validationRows:validation.length,testRows:test.length,features:FEATURE_NAMES,hiddenUnits:fit.hiddenUnits,weightsInputHidden:fit.weightsInputHidden,biasHidden:fit.biasHidden,weightsHiddenOutput:fit.weightsHiddenOutput,biasOutput:fit.biasOutput,epochs:fit.epochs,seed:fit.seed,metrics:{trainMae:0,validationMae:0,testMae:0,testRmse:0,testActionAgreement:0},datasetFingerprint:generated.fingerprint};
  const trainMetrics=evaluateModel(base,train),validationMetrics=evaluateModel(base,validation),testMetrics=evaluateModel(base,test);
  base.metrics={trainMae:trainMetrics.mae,validationMae:validationMetrics.mae,testMae:testMetrics.mae,testRmse:testMetrics.rmse,testActionAgreement:testMetrics.actionAgreement};
  scope.postMessage({type:'complete',model:base,samples:generated.samples,settings,splitCounts:{train:train.length,validation:validation.length,test:test.length}});
 }catch(error){scope.postMessage({type:'error',message:error instanceof Error?error.message:String(error)});}
};
