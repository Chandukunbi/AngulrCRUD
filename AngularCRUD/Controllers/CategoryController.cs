using DAL;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AngularCRUD.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        DatabaseContext _db;
        public CategoryController(DatabaseContext db)
        {
            _db = db;
        }

        [HttpGet]
        public IEnumerable<Category> GetCategorys()
        {
            return _db.Categories.ToList();
        }

        [HttpGet("{id}")]
        public Category GetCategory(int id)
        {
            return _db.Categories.Find(id);
        }

        [HttpPost]
        public IActionResult AddCategory(Category model)
        {
            try
            {
                _db.Categories.Add(model);
                _db.SaveChanges();
                return StatusCode(StatusCodes.Status201Created);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        [HttpPut("{id}")]
        public IActionResult UpdateProduct(int id, Category model)
        {
            try
            {
                if (id != model.CategoryId)
                    return BadRequest();

                _db.Categories.Update(model);
                _db.SaveChanges();
                return StatusCode(StatusCodes.Status200OK);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteCategory(int id)
        {
            Category model = _db.Categories.Find(id);
            if(model!= null)
            {
                _db.Categories.Remove(model);
                _db.SaveChanges();
                return StatusCode(StatusCodes.Status200OK);
            }

            return StatusCode(StatusCodes.Status404NotFound);
        }

    }
}
