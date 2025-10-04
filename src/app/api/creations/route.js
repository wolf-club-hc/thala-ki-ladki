import sql from "@/app/api/utils/sql";
import { auth } from "@/auth";

export async function GET(request) {
  try {
    const url = new URL(request.url);
    const userId = url.searchParams.get('userId');
    const isPublic = url.searchParams.get('public');
    const search = url.searchParams.get('search');
    const limit = parseInt(url.searchParams.get('limit') || '20');
    const offset = parseInt(url.searchParams.get('offset') || '0');

    let query = `
      SELECT uc.*, au.name as author_name, au.email as author_email,
             COALESCE(ul.user_id IS NOT NULL, false) as is_liked_by_user
      FROM user_creations uc 
      LEFT JOIN auth_users au ON uc.user_id = au.id
      LEFT JOIN user_likes ul ON uc.id = ul.creation_id AND ul.user_id = $1
      WHERE 1=1
    `;
    const params = [null]; // placeholder for current user id
    let paramIndex = 2;

    // Get current user for likes
    const session = await auth();
    if (session?.user?.id) {
      params[0] = session.user.id;
    }

    if (userId) {
      query += ` AND uc.user_id = $${paramIndex}`;
      params.push(userId);
      paramIndex++;
    }

    if (isPublic === 'true') {
      query += ` AND uc.is_public = true`;
    }

    if (search) {
      query += ` AND (LOWER(uc.title) LIKE LOWER($${paramIndex}) OR LOWER(uc.description) LIKE LOWER($${paramIndex}))`;
      params.push(`%${search}%`);
      paramIndex++;
    }

    query += ` ORDER BY uc.created_at DESC LIMIT $${paramIndex} OFFSET $${paramIndex + 1}`;
    params.push(limit, offset);

    const creations = await sql(query, params);
    
    return Response.json({ creations });
  } catch (error) {
    console.error('Error fetching creations:', error);
    return Response.json({ error: 'Failed to fetch creations' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return Response.json({ error: 'Authentication required' }, { status: 401 });
    }

    const body = await request.json();
    const { title, description, thumbnail_url, data_url, design_data, is_public = true } = body;

    if (!title || !data_url) {
      return Response.json({ error: 'Title and data_url are required' }, { status: 400 });
    }

    const creation = await sql(
      `INSERT INTO user_creations (user_id, title, description, thumbnail_url, data_url, design_data, is_public) 
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [session.user.id, title, description, thumbnail_url, data_url, JSON.stringify(design_data), is_public]
    );

    return Response.json({ creation: creation[0] });
  } catch (error) {
    console.error('Error creating user creation:', error);
    return Response.json({ error: 'Failed to create creation' }, { status: 500 });
  }
}