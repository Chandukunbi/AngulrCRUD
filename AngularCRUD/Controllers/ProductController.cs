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
    public class ProductController : ControllerBase
    {
        DatabaseContext _db;
        public ProductController(DatabaseContext db)
        {
            _db = db;
        }

        [HttpGet]
        public IEnumerable<Product> GetProducts()
        {
            return _db.Products.ToList();
        }

        [HttpGet("{id}")]
        public Product GetProduct(int id)
        {
            return _db.Products.Find(id);
        }

        [HttpPost]
        public IActionResult AddProduct(Product model)
        {
            try
            {
                _db.Products.Add(model);
                _db.SaveChanges();
                return StatusCode(StatusCodes.Status201Created);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        [HttpPut("{id}")]
        public IActionResult UpdateProduct(int id, Product model)
        {
            try
            {
                if (id != model.ProductId)
                    return BadRequest();

                _db.Products.Update(model);
                _db.SaveChanges();
                return StatusCode(StatusCodes.Status200OK);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteProduct(int id)
        {
            Product model = _db.Products.Find(id);
            if(model!= null)
            {
                _db.Products.Remove(model);
                _db.SaveChanges();
                return StatusCode(StatusCodes.Status200OK);
            }

            return StatusCode(StatusCodes.Status404NotFound);
        }

    }
}
