import sql from "@/app/api/utils/sql";
import { auth } from "@/auth";

export async function POST(request, { params }) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return Response.json({ error: 'Authentication required' }, { status: 401 });
    }

    const creationId = params.id;

    // Check if already liked
    const existingLike = await sql(
      'SELECT id FROM user_likes WHERE user_id = $1 AND creation_id = $2',
      [session.user.id, creationId]
    );

    if (existingLike.length > 0) {
      // Unlike
      await sql.transaction([
        sql('DELETE FROM user_likes WHERE user_id = $1 AND creation_id = $2', [session.user.id, creationId]),
        sql('UPDATE user_creations SET like_count = like_count - 1 WHERE id = $1', [creationId])
      ]);
      
      return Response.json({ liked: false, message: 'Unliked successfully' });
    } else {
      // Like
      await sql.transaction([
        sql('INSERT INTO user_likes (user_id, creation_id) VALUES ($1, $2)', [session.user.id, creationId]),
        sql('UPDATE user_creations SET like_count = like_count + 1 WHERE id = $1', [creationId])
      ]);
      
      return Response.json({ liked: true, message: 'Liked successfully' });
    }
  } catch (error) {
    console.error('Error toggling like:', error);
    return Response.json({ error: 'Failed to toggle like' }, { status: 500 });
  }
}