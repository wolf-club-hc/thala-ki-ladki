import sql from "@/app/api/utils/sql";

export async function GET(request) {
  try {
    const url = new URL(request.url);
    const category = url.searchParams.get('category');
    const featured = url.searchParams.get('featured');

    let query = 'SELECT * FROM templates WHERE 1=1';
    const params = [];
    let paramIndex = 1;

    if (category) {
      query += ` AND category = $${paramIndex}`;
      params.push(category);
      paramIndex++;
    }

    if (featured === 'true') {
      query += ` AND is_featured = true`;
    }

    query += ' ORDER BY created_at DESC';

    const templates = await sql(query, params);
    
    return Response.json({ templates });
  } catch (error) {
    console.error('Error fetching templates:', error);
    return Response.json({ error: 'Failed to fetch templates' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, description, thumbnail_url, data_url, category = 'general', is_featured = false } = body;

    if (!name || !thumbnail_url || !data_url) {
      return Response.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const template = await sql(
      'INSERT INTO templates (name, description, thumbnail_url, data_url, category, is_featured) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [name, description, thumbnail_url, data_url, category, is_featured]
    );

    return Response.json({ template: template[0] });
  } catch (error) {
    console.error('Error creating template:', error);
    return Response.json({ error: 'Failed to create template' }, { status: 500 });
  }
}