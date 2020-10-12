import { Router } from 'express';
import { Issue } from '../entities/issue';
import { MikroORM, wrap } from '@mikro-orm/core';

export const issuesRouter = Router();

issuesRouter

  .use((req, res, next) => {
    req.issuesRepository = req.orm.em.getRepository(Issue);
    next();
  })

  // összes lekérdezése
  .get('', async (req, res) => {
    const title = req.query?.title || '';
    const issues = await req.issuesRepository!.find({
      title: {
        $like: `%${title}%`,
      },
    });
    res.send(issues);
  })

  // egy konkrét lekérdezése
  .get('/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const issue = await req.issuesRepository!.findOne({ id }, ['labels']);
    // await wrap(issue).init(true, ['labels']);
    res.send(issue);
  })

  // új létrehozása
  .post('', async (req, res) => {
    // Létrehozok egy issue osztályba tartozó objektumot
    const issue = new Issue();

    // Mikroorm-mel adok neki néhány segédmetódust
    const wrappedIssue = wrap(issue);

    // a request összes issueban is megtalálható propertyjét besettelem az objektumba
    wrappedIssue.assign(req.body, { em: req.orm.em });

    const labels = issue.labels.getItems();
    if (labels) {
      labels
        .filter(label => label.id)
        .forEach(label => req.orm.em.merge(label));
    }

    // lementi és beküldi a db-be
    await req.issuesRepository!.persistAndFlush(issue);

    res.send(issue);
  });
