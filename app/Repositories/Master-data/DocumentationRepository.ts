import Documentation from "App/Models/Master-data/Documentation";
import BaseRepository from "../BaseRepository";
import { response, responseErrors } from "App/helper";
import Database from '@ioc:Adonis/Lucid/Database'
import DocumentationListStep from "App/Models/Master-data/DocumentationListStep";
import DocumentationMap from "App/Models/Master-data/DocumentationMap";
import DocumentationChart from "App/Models/Master-data/DocumentationChart";
import DocumentationFlow from "App/Models/Master-data/DocumentationFlow";

export default class DocumentationRepository extends BaseRepository {
    constructor() {
        super(Documentation);
    }
    async docpaginate(req: any) {
        try {
            const { sortBy, search, sortDesc, page, limit } = req
            const count = await Database
                .from('documentations')
                .count('* as total')
            const q = await Documentation.query()
                .where(sortBy !== '' ? sortBy : 'title', 'LIKE', '%' + search + '%')
                .orderBy([
                    {
                        column: sortBy !== '' ? sortBy : 'title',
                        order: sortDesc ? 'desc' : 'asc',
                    }
                ])
                .preload('listep')
                .preload('map')
                .preload('chart')
                .preload('flow')
                .paginate(page, limit < 5 ? count[0].total : limit)
            return response(200, q)
        } catch (error) {
            return responseErrors(error)
        }
    }
    async storeDoc(req: any) {
        const trx = await Database.transaction();
        try {
            // Create parent within the transaction
            const parent = await Documentation.create({ title: req.title, desc: req.desc }, trx);
            // Create and associate children within the transaction
            await DocumentationListStep.createMany(
                req.listep.map((ls: { title: string; desc: string; }) => ({
                    documentation_id: parent.id,
                    title: ls.title,
                    desc: ls.desc,
                })), trx);
            // Create and associate children within the transaction
            await DocumentationMap.createMany(
                req.mapstep.map((mp: { step: number; text: string; }) => ({
                    documentation_id: parent.id,
                    step: mp.step,
                    text: mp.text,
                })), trx);
            // Create and associate children within the transaction
            await DocumentationChart.createMany(
                req.flowchart.chart.map((ch: {
                    id: string; x: number; y: number; width: number; height: number; name: string; type: string; shape: string;
                }) => ({
                    id: ch.id,
                    documentation_id: parent.id,
                    x: ch.x,
                    y: ch.y,
                    width: ch.width,
                    height: ch.height,
                    name: ch.name,
                    type: ch.type,
                    shape: ch.shape,
                })), trx);
            // Create and associate children within the transaction
            await DocumentationFlow.createMany(
                req.flowchart.flow.map((fl: { source: { id: string; position: string; }; destination: { id: string; position: string; }; type: string; style: any; markerEnd: string; }) => ({
                    documentation_id: parent.id,
                    source: JSON.stringify({ id: fl.source.id, position: fl.source.position }),
                    destination: JSON.stringify({ id: fl.destination.id, position: fl.destination.position }),
                    type: fl.type,
                    style: JSON.stringify(fl.style),
                    markerd: fl.markerEnd,
                })), trx);
            await trx.commit();
        } catch (error) {
            await trx.rollback()
            return responseErrors(error)
        } finally {
            return response(200, req)
        }
    }
    async updateDoc(id: number, req: any) {
        try {
            await Database.transaction(async (trx) => {
                // update document
                const doc1 = await Documentation.findOrFail(id)
                doc1.title = req.title
                doc1.desc = req.desc
                doc1.useTransaction(trx)
                await doc1.save()

                // delete related data::start
                await DocumentationListStep.query().where('documentation_id', id).delete()
                await DocumentationMap.query().where('documentation_id', id).delete()
                await DocumentationChart.query().where('documentation_id', id).delete()
                await DocumentationFlow.query().where('documentation_id', id).delete()
                // delete related data::end

                // create document list
                await doc1
                    .related('listep')
                    .createMany(req.listep)
                // create document roudmap
                await doc1
                    .related('map')
                    .createMany(req.mapstep)
                // create document chart
                await doc1
                    .related('chart')
                    .createMany(req.flowchart.chart)
                // create document flow
                await doc1
                    .related('flow')
                    .createMany(
                        req.flowchart.flow.map((fl: { source: { id: string; position: string; }; destination: { id: string; position: string; }; type: string; style: any; markerEnd: string; }) => ({
                            documentation_id: doc1.id,
                            source: JSON.stringify({ id: fl.source.id, position: fl.source.position }),
                            destination: JSON.stringify({ id: fl.destination.id, position: fl.destination.position }),
                            type: fl.type,
                            style: JSON.stringify(fl.style),
                            markerd: fl.markerEnd,
                        })))
            })
        } catch (error) {
            return responseErrors(error)
        } finally {
            return response(200, req)
        }
    }
    async showDoc(id: number) {
        try {
            const data = await Documentation
                .query()
                .where('id', id)
                .preload('listep')
                .preload('map')
                .preload('chart')
                .preload('flow')
                .first()
            return response(200, { data })
        } catch (error) {
            return responseErrors(error)
        }
    }
}
