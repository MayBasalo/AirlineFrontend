const BASE_URL = 'http://localhost:8080/api';

export const fetchEntities = (entity) =>
  fetch(`${BASE_URL}/${entity}`).then(res => res.json());

export const fetchEntityById = (entity, id) =>
  fetch(`${BASE_URL}/${entity}/${id}`).then(res => res.json());

export const createEntity = (entity, data) =>
  fetch(`${BASE_URL}/${entity}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  }).then(res => res.json());

export const updateEntity = (entity, id, data) =>
  fetch(`${BASE_URL}/${entity}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  }).then(res => res.json());

export const deleteEntity = (entity, id) =>
  fetch(`${BASE_URL}/${entity}/${id}`, { method: 'DELETE' });
